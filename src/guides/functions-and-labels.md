# Functions and Labels

## Functions

A function is a piece of code that performs a specific set of actions and operations. They can be executed by other parts of the program, and can take arguments and produce a return value.

```wiz
func f(arg : argument_type, arg2 : argument_type2, arg3 : argument_type3) : return_type {
    statement;
    statement;
    statement;
}
```

Example:

```wiz
func poke(dest : u16 in hl, value : u8 in a) {
    *(dest as *u8) = a;
}

func sum(left : u8 in b, right : u8 in c) : u8 in a {
    return left + right;
}
```

## Return Statements

A `return` statement is used to return from the currently executing function.

```wiz
return;
return if condition;
```

If used in a function that has no return type, it cannot have a return value. If used in a function that has a return type, the return value must be of the same type.

Example:

```wiz
func collect_egg() {
    a = egg_count;
    if a >= 5 {
        return;
    }

    egg_count++;
}

func triple(value : u8 in b) : u8 in a {
    return b + b + b;
}
```

A `return` that exists outside of any function body is a low-level `return` instruction. This would pop a location from the stack and jump there.

## Call Statement

A call statement is a kind of statement that invokes a function. If the function being called produces a return value, the value is discarded. If the function call returns, the code following it will execute. Intrinsic instructions can also be called in the same manner.

```wiz
function(argument1, argument2, argument3);
```

## Tail-Call Statements

A statement of form `return f();` is a tail-call statement. It gets subsituted for a `goto`, and avoids the overhead of subroutine call that would push a program counter to the stack. However, unlike a `goto`, a tail-call will evaluate arguments to a function, like a normal function call.

```wiz
func call_subroutine(dest : u16 in hl) {
    goto *(dest as *func);
}
```

## Labels

Labels are like functions, but will never return, and cannot be passed arguments. As a low-level detail, labels of form `f:` are effectively the same thing as an empty-fallthrough function `#[fallthrough] func f() {}` placed directly before whatever code is executed. A label can be used in any bank that has a known address. (An address is currently required, but eventually, this requirement could relaxed to allow banks which use relative addressing only.)

Example:

```wiz
label:
    goto label;
```

Labels or functions can be the target of call expressions, or `goto` statements.

## Inline Functions

An `inline func` is like `func` but inlined directly wherever it is used. As a consequence, the contents of the function are inserted wherever it is called, and the function has no address.

Example:

```wiz
inline func times_two() {
    a = a << 1;
}

a = 20;
times_two();
times_two();
```

An `inline func` can still `return`, like a normal function. However, it will not use the stack. Instead, it will jump to a hidden return label that exists at the end of the function.

Because an `inline func` has no address, an `inline func` cannot be stored in a function pointer, and cannot be branched to from a `goto` or tail-call statement.

