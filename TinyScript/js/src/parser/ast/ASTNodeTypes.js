const Enum = require("../../common/Enum")

module.exports = {
    BLOCK : new Enum("BLOCK", 1),
    BINARY_EXPR: new Enum("BINARY_EXPR", 2),
    UNARY_EXPR: new Enum("UNARY_EXPR", 3),
    VARIABLE: new Enum("VARIABLE", 4),
    IF_STMT: new Enum("IF_STMT", 5),
    WHILE_STMT: new Enum("WHILE_STMT", 6),
    FOR_STMT: new Enum("FOR_STMT", 7),
    ASSIGN_STMT : new Enum("ASSIGN_STMT", 8),
    FUNCTION_DECLARE_STMT: new Enum("FUNCTION_DECLARE_STMT", 9),
    DECLARE_STMT : new Enum("DECLARE_STMT", 10),
    SCALAR : new Enum("SCALAR", 11),
    RETURN_STMT :new Enum("RETURN_STMT", 12),
    FUNCTION_ARGS :new Enum("FUNCTION_ARGS", 13),
    CALL_EXPR : new Enum("CALL_EXPR", 14)
}