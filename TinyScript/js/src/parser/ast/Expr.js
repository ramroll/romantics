const ASTNode = require("./ASTNode");
const ASTNodeTypes = require("./ASTNodeTypes");
const table = require("../util/PriorityTable");

class Expr extends ASTNode {
  constructor() {
    super();
  }

  static fromToken(type, token) {
    const expr = new Expr();
    expr.label = token.getValue();
    expr.lexeme = token;
    expr.type = type;
    return expr;
  }
}

module.exports = Expr;

const { Factor, CallExpr } = require("./index");
/**
 * left: E(k) -> E(k) op(k) E(k+1) | E(k+1)
 * right:
 *   E(k) -> E(k+1) E_(k)
 *     // const e = new Expr(); e.left = E(k+1); e.right = E_(k).child(0)
 *     // combine
 *   E_(k) -> op(k) E(k+1) E_(k) | ε
 *     // race
 *
 *   // U -> (E) | ++E | --E
 *   E(t) -> F E_(t) | U E_(t)
 *
 *
 *
 * @param {*} it
 */
Expr.parse = it => {
  return Expr.E(it, 0);
};

Expr.E = (it, k) => {
  if (k < table.length - 1) {
    return Expr.combine(
      it,
      () => Expr.E(it, k + 1),
      () => Expr.E_(it, k)
    );
  } else {
    return Expr.race(
      it,
      () =>
        Expr.combine(
          it,
          () => Expr.F(it),
          () => Expr.E_(it, k)
        ),
      () =>
        Expr.combine(
          it,
          () => Expr.U(it),
          () => Expr.E_(it, k)
        )
    );
  }
};

// E_(k) -> op(k) E(k+1) E_(k) | ε
Expr.E_ = (it, k) => {
  const token = it.peek();
  const value = token.getValue();

  if (table[k].indexOf(value) !== -1) {
    it.nextMatch(value);
    const expr = Expr.fromToken(ASTNodeTypes.BINARY_EXPR, token);
    expr.addChild(
      Expr.combine(
        it,
        () => Expr.E(it, k + 1),
        () => Expr.E_(it, k, it)
      )
    );

    return expr;
  }
  return null;
};

Expr.U = it => {
  const token = it.peek();
  const value = token.getValue();

  if (value === "(") {
    it.nextMatch("(");
    const expr = Expr.parse(it);
    it.nextMatch(")");
    return expr;
  } else if (value === "++" || value === "--" || value === "!") {
    const t = it.peek();
    it.nextMatch(value);

    const expr = Expr.fromToken(ASTNodeTypes.UNARY_EXPR, t);
    expr.addChild(Expr.parse(it));
    return expr;
  }
  return null;
};

Expr.F = it => {
  const factor = Factor.parse(it);
  if (factor == null) {
    return null;
  }
  if (it.hasNext() && it.peek().getValue() === "(") {
    return CallExpr.parse(factor, it);
  }
  return factor;
};

Expr.combine = (it, funcA, funcB) => {
  if (!it.hasNext()) {
    return null;
  }
  const a = funcA();
  if (a == null) {
    return null;
    // return it.hasNext() ? funcB() : null
  }
  const b = it.hasNext() ? funcB() : null;
  if (b == null) {
    return a;
  }

  const expr = Expr.fromToken(ASTNodeTypes.BINARY_EXPR, b.lexeme);
  expr.addChild(a);
  expr.addChild(b.getChild(0));
  return expr;
};

Expr.race = (it, funcA, funcB) => {
  if (!it.hasNext()) {
    return null;
  }
  const a = funcA();
  if (a == null) {
    return funcB();
  }
  return a;
};
