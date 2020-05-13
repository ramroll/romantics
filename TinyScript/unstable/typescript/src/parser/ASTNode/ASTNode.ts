import { Token } from "../../lexer/Token";

export enum ASTNodeTypes {
  BLOCK, // 语句块
  BINARY_EXPR, // 二元表达式 如: 1 + 1
  UNARY_EXPR, // 一元表达式 如: 1 ++
  VARIABLE, // 变量
  IF_STMT,
  WHILE_STMT,
  FOR_STMT,
  ASSIGN_STMT,
  FUNCTION_DECLARE_STMT,
  DECLARE_STMT,
  SCALAR,
  RETURN_STMT,
  FUNCTION_ARGS,
  CALL_EXPR
}

interface IASTNode {
  parent: IASTNode
  children: Array<IASTNode>
  lexeme: Token
  type: ASTNodeTypes
  label: string
  props: { [propName: string]: any }

  getChild(index: number): IASTNode
  addChild(node: IASTNode): void
  getLabel(): string
  setLabel(label: string): void
  getLexeme(): Token
  setLexeme(lexeme: Token): void
  getType(): ASTNodeTypes
  setType(type: ASTNodeTypes): void
  getChildiren(): Array<IASTNode>
  isValueType(): boolean
  getProp(key: string): any
  setProp(key: string, value: any): void
  print(indent: number): void
}
// 树节点 基类
export class ASTNode implements IASTNode {
  parent: IASTNode;
  children: IASTNode[];
  lexeme: Token<string>;
  type: ASTNodeTypes;
  label: string;
  props: { [propName: string]: any; };
  constructor(type: ASTNodeTypes, label: string) {
    this.parent = null
    this.children = []

    this.lexeme = null
    this.type = type
    this.label = label

    this.props = {}
  }
  getChild(index: number): IASTNode {
    return this.children[index] || null
  }
  addChild(node: IASTNode): void {
    node.parent = this
    this.children.push(node)
  }
  getLabel(): string {
    return this.label
  }
  setLabel(label: string): void {
    this.label = label
  }
  getLexeme(): Token<string> {
    return this.lexeme
  }
  setLexeme(lexeme: Token<string>): void {
    this.lexeme = lexeme
  }
  getType(): ASTNodeTypes {
    return this.type
  }
  setType(type: ASTNodeTypes): void {
    this.type = type
  }
  getChildiren(): IASTNode[] {
    return this.children
  }
  isValueType(): boolean {
    return this.type === ASTNodeTypes.VARIABLE || this.type === ASTNodeTypes.SCALAR
  }
  getProp(key: string) {
    return this.props[key] || null
  }
  setProp(key: string, value: any): void {
    this.props[key] = value
  }
  print(indent: number = 0): void {
    console.log(`${"".padStart(indent * 2, " ")}${this.label}`)
    this.children.forEach(x => x.print(indent + 1))
  }
}