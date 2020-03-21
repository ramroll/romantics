module.exports = {
    get AssignStmt() {
        return require("./AssignStmt") 
    },
    get Stmt() {
        return require('./Stmt')
    },
    get DeclareStmt() {
        return require('./DeclareStmt')
    },
    get Block() {
        return require('./Block')
    },
    get IfStmt() {
        return require('./IFStmt')
    },
    get Expr() {
        return require("./Expr")
    },
    
    get Factor() {
        return require("./Factor")
    },

    get Variable() {
        return require('./Variable')
    },

    get Scalar() {
        return require('./Scalar')
    },
    get FunctionDeclareStmt() {
        return require('./FunctionDeclareStmt')
    },
    get ReturnStmt() {
        return require('./ReturnStmt')
    },
    get FunctionArgs(){
        return require("./FunctionArgs")
    },
    get CallExpr() {
        return require('./CallExpr')
    }
   
}