# Syntax

## Comments

Line comments start with `//` and end at the end of the line:

```wiz
// This is a comment.
```

## Banks

Banks are sections or segments that are used to hold the different pieces of the program, such as variables, constants, or executable code.

A bank declaration reserves a bank of memory with a given type and address. It has the following syntax:

```wiz
bank name @ address, name @ address, name @ address : [type; size];
```

The type of bank of `bank` determines what kind of declarations can be placed there. 

- `vardata` is uninitialized RAM. useful for variables that can be written to and read back at runtime. Because this section is uninitialized, variables declared here must be assigned a value at execution time. Because of these limitations, compiled code and and constant data cannot be placed here.
- `prgdata` is ROM used for program code and constants. Cannot be written to.
- `constdata` is ROM used for constants and program code. Cannot be written to.
- `chrdata` is ROM used for character / tile graphic data. This type of bank has a special meaning on platforms like the NES, where character data is on a separate memory bus. It is otherwise the same as `constdata`.
- The distinction between `prgdata` and `constdata` will only exist on Harvard architectures, where the program and constant data live on separate buses. Otherwise, just use it for clarifying the purpose of ROM banks, if it matters.
- `varinitdata` is initialized RAM. Useful for programs with code and data that get uploaded to RAM. 

The size of a `bank` is the number of bytes that it will hold. Exceeding this size limitation is considered an error.

The address of a `bank` after the `@` is optional but if it appears, it must be an integer literal. Without an address, the `bank` can cannot contain label declarations.

After a bank is declared, it must be selected to be used by an `in` directive.

```wiz
in bank {
    // ...
}
```

An address can also be provided to an `in` directive. If a `bank` previously had no address, then the address becomes the origin of the `bank`. However, if a `bank` previously had an address, the block is seeked ahead for to given address.

```wiz
in bank @ address {
    // ...
}
```

Example:

```wiz
bank zeropage @ 0x00 : [vardata; 256];

in zeropage {
    var timer : u8;
}
```

## Constants

A constant declaration reserves pre-initialized data that can't be written to at run-time. A constant can appear in a ROM bank, such as `prgdata`, `constdata`, or `chrdata`.

```wiz
const name : type = value;
```

Example: 
```wiz
const hp : u8 = 100;
const wow : [u8] = [0, 1, 2, 3, 4, 5, 6];
const egg : [u16; 5] = [12345, 54321, 32333, 49293];
```

If the type is provided, the initializer is narrowed to the type provided. This means that integer initializers of type `iexpr` that have no size can be implicitly narrowed to sized integer types like `u8`, and array initializers of type `[iexpr]` can be narrowed to `[u8]`, and so on.

Note that The size of an array type can be left off, if the tyep. 

If the type of a constant can be inferred from the value, then the type can be left off. However, only types with a known size can be constants. `iexpr` has unknown size, so type-suffixes on integers may be required.

Example: 

```wiz
const length = 100u8;
const message = "HELLO WORLD";
const table = embed "table.bin";
```

The name of a constant is also optional, when placing data in the ROM is desired but a label to it isn't needed.

Example: 

```wiz
const = embed "hero.chr";
```

Array comprehensions are a nice way to generate tables of data.

```wiz
const tripled_values : [u8] = [x * 3 for let x in 0 .. 49];
```

## Variables

A variable declaration reserves a space for mutable storage. A variable can appear either in RAM bank such as `vardata`, or `varinitdata`.

```wiz
var x : u8;
```

A variable declared in a `varinitdata` bank is allowed to have a initializer.

```wiz
var x = 100; 
```

If an initializer is given, the type can be omitted if the initializer expression has a type of known size.

```wiz
var x = 
var message = "hello"; 
```

A variable declared in a `vardata` bank, on the other hand, is reserved in uninitialized RAM, so it cannot have an initializer and can only be assigned a value at run-time.

## Extern Variables (Memory Mapped I/O Registers)

An `extern` variable can be used to declare a piece of external storage that exists at a specific address. Its primary use is for defining memory-mapped I/O registers on a system, so that they can referenced by name.

Example:

```wiz
extern var reg @ 0xF000; // read/write
extern writeonly reg2 @ 0xF001; // write-only
extern const reg3 @ 0xF002; // read-only
```

## Let Definitions

A `let` definition can be used to bind a name to a constant expression. This can reduce the amount of magic numbers appearing in code. These don't require any ROM space where they're defined, but are instead are substituted into whatever expressions that use them.

```wiz
let name = expression;
```

The expression of a `let` definition can be any valid expression. It is recommended to not pass expressions that contain
 side-effects. In the future, the compiler may forbid this, but for now this is not validated.

Example:

```wiz
let HP = 100;
let NAME = "Hello";
```

It is also for a `let` definition to take arguments:

```wiz
let CEILING_DIV(x, y) = (x + y - 1) / y;
let MAP_WIDTH = CEILING_DIV(1000, 8);
```

## Empty Statement

A single `;` is allowed anywhere, and is an empty statement. It has no effect.

## Assignment Statement

An assignment statement is used to store a value somewhere. Depending on where the value is stored, it can be retrieved again later.

```wiz
dest = source; // assignment
dest += source; // compound assignment
dest++; // post-increment
dest--; // post-decrement
++dest; // pre-increment
--dest; // pre-decrement
```

The left-hand side of an assignment `=` is the destination, which can be a mutable register or a mutable location in memory. The right-hand side of an assignment `=` is the source, which can be a constant, a register, a readable memory location, or a run-time calculation. The source and destination must be of compatible type, or it is an error.

Example:

```wiz
x = 100;
a = max_hp - hp;
damage = a;
```

After constant expression folding, any remaining run-time operations must have instructions available for them. It must be either an exact instruction that does the calcuation and stores it in the destination, or a series of instructions that first load the into the destination, and then modify the destination. For an assignment containing a binary expression like `a = b + c;`, instruction selection will first look for an exact instruction of form `a = b + c;`. Failing that, it will attempt decomposing the assignment `a = b + c` into the form `a = b; a = a + c;`.

Failing that, it is an error, and will probably require the assignment to be manually re-written in terms of multiple assignment statements. Assignments containing run-time operations cannot require an implicit temporary expression, or it is an error.

Most expressions are evaluated in left-to-right fashion, and as a result, they must be written so that they can be left-folded without temporaries. This requirement means parenthesized expressions can happen on the left, but the right-hand side will be a constant or simple term.

Example:

```wiz
// This is OK, because it can be decomposed.
a = (5 + c) - b; 
// The above becomes:
// a = 5;
// a = a + c
// a = a - b;

// This is an error, even in its reduced form:
a = b - (5 + c);
// The above becomes:
// a = b;
// a = a - (5 + c) // the (5 + c) requires a temporary.
```

Oftentimes, it won't be possible to assign a value directly to memory. In these cases, the code will need to put an intermediate assignment into a register first, and then store the register into the memory afterwards.

Example:

```wiz
// If there's no instruction available to assign immediate values to memory, this line will be an error.
hp = 100;

// It must be re-written to use a register in the middle.
// This will work if there is a register named a,
// and there is an instruction to load an immediate to register a,
// and there is another instruction to load memory with the value of the register.
a = 100;
hp = a;
```

Assignments can be chained together if they're compatible.

Example:

```wiz
// This is the same as:
// a = x;
// y = a;
y = a = x;

// This is the same as:
// a = hp;
// a = a - 10;
// hp = a;
hp = a = hp - 10;
```

Compound assignment operators exist for most binary arithmetic operations. For some operation `+`, the statement `a += b` is the same as writing `a = a + b;`. If the right-hand side contains a calculation it is implicitly parenthesized, so that `a += b + c` is the same as `a = a + (b + c);`

Example:

```wiz
a += 5; // same as a = a + 5;
```

There are also unary incrementation `++` and decrementation `--` operators.

Example:

```wiz
x++;
y--;
++x;
++y;
```

Sometimes assignments might be used for their side-effects only, such as when writing to an external hardware register. Some such registers are `writeonly`, which indicates that they cannot be read back later, or that reading back will produce an open-bus value.

```wiz
snes.ppu.bg_mode = a;
```

Similarly, there can be side-effects that occur when reading an external hardware register.

Assignments may also result in processor status flag registers being changed as a side-effect. Sometimes, a throw-away calculation in some registers or temporary memory might be performed simply to affect a conditional flag. The effect on flags depends on what sequence of instructions are generated as a result of the assignment. Not every operation affects every flag consistently, due to the design of the processor hardware. Knowing what instructions affect flags and which don't requires some study.

A common-to-find flag is the `zero` flag. If an instruction affects the zero flag, it might be used to indicate whether the result of the last operation was equal to zero. This side-effect can be used sometimes to avoid an extra comparison instruction later.

Example:

```wiz
x = 10;
do {
    x--;
} while !zero;
```

A `carry` flag is a common flag to be affected by arithmetic operations such as addition/subtraction. The interpretation of a `carry` flag is dependent on the system. There are operations like add with carry `+#`, subtract with carry `-#`, rotate left with carry `<<<<#`, and rotate right with carry `>>>>#` which depend upon the last state of the `carry`. These operations can be useful for extending arithmetic operations to work on larger numeric values.

Example:

```wiz
// add 0x0134 to bc.
c = a = c + 0x34;
b = a = b +# 0x01;
```

Some CPUs allow the `carry` to be set or cleared by assigning to it.

Examples:

```wiz
carry = false;
carry = true;
```

## Block Statement

A block statement is a scoped section of code that contains a collection of statements. It is started with an opening brace `{` and must be terminated later with a closing brace `}`. All declarations within.

Many types of statement contain block statements as part of their syntax. For these kinds of statements, the braces delimiting a block statement are not optional, even if only a single statement is present.

## Attributes

Attributes are a form of special metadata that can be placed before a statement, directive, or declaration. They can provide the compiler with extra details about a particular piece of code.

Example:

```wiz
#[fallthrough] func lasagna() {
    idx8();
    #[idx8] {
        x = 9;
    }

    idx16();
    #[idx16] {
        xx = 99;
        yy = xx;
    }

    while true {}
}

#[nmi] func vblank() {
    // ...
}

let INCLUDE_THIS_MESSAGE = true;

#[compile_if(INCLUDE_THIS_MESSAGE)] const message = "HI THIS IS A CONDITIONALLY COMPILED MESSAGE";

```

Attributes

- `compile_if(condition)` - indicates that some code should only be compiled if a particular compile-time boolean condition is `true`. If the condition is `false`, the code tagged with the attribute is not emitted.
- `fallthrough` - indicates the function might fall through into the immediately following code, and disables the implicit return at the end of the function. Useful for tagging functions that are guaranteed to never return, or functions that are meant to fall into some other code afterwards.
- `nmi` - indicates that a function handles a non-maskable interrupt request. All `return;` instructions will be translated into `nmireturn;` instead. (eg. `rti` on 6502, `retn` on Z80)
- `irq` - indicates that a function handles a maskable interrupt request. All `return;` instructions will be translated into `irqreturn;` instead.  (eg. `rti` on 6502, `reti` on Z80)

65816 Attributes

- `mem8` - assumes the tagged statements will be using an 8-bit accumulator and main memory-related instructions. (eg. accumulator arithmetic, storing/loading from accumulator, bit-shifting accumulator/memory)
- `mem16` - assumes the tagged statements will be using an 16-bit accumulator and main memory-related instructions.  (eg. accumulator arithmetic, storing/loading from accumulator, bit-shifting accumulator/memory)
- `idx8` - assumes the tagged statements will be using 8-bit index registers and indexing-related instructions. (eg. indexing, storing/loading from index registers, push/pop)
- `idx16` - assumes the tagged statements will be using 16-bit index registers and indexing-related instructions.  (eg. indexing, storing/loading from index registers, push/pop)

## Expressions

```wiz
(a) // parentheses

-a // signed negation. integer
+a // signed identity. integer

// Arithmetic operators.
// integer + integer -> integer
a + b // add. integer + integer -> integer
a +# b // add with carry. integer +# integer -> integer
a - b // subtract. integer - integer -> integer
a -# b // subtract with carry. integer -# integer -> integer
a * b // multiply. integer * integer -> integer
a / b // divide. integer / integer -> integer
a % b // modulo. integer % integer -> integer
a << b // arithmetic left shift. integer << integer -> integer
a >> b // arithmetic right shift. integer >> integer -> integer
a <<< b // logical left shift. integer <<< integer -> integer
a >>> b // logical right shift. integer >>> integer -> integer
a <<<< b // left rotate (N bits). integer <<<< integer -> integer
a >>>> b // right rotate (N bits). integer >>>> integer -> integer
a <<<<# b // left rotate with carry (N+1 bits). integer <<<<# integer -> integer
a >>>># b // right rotate with carry (N+1 bits). integer >>>># integer -> integer

// Logical operators.
!a // logical negation. bool
a && b // logical and. bool && bool -> bool
a || b // logical or. bool || bool -> bool

~a // bitwise negation. integer | integer -> integer
a & b // bitwise and. integer | integer -> integer
a | b // bitwise or. integer | integer -> integer
a ^ b // bitwise xor. integer ^ integer -> integer
a $ b // bit indexing. integer $ integer -> bool
<:a // low byte access (bits 0 .. 7). integer -> u8
>:a // high byte access (bits 8 .. 15). integer -> u8
#:a // bank byte access (bits 16 .. 23). integer -> u8

a++ // post-increment. integer
a-- // post-decrement. integer
++a // pre-increment. integer
--a // pre-decrement. integer

*a // indirection. *T -> T
&a // address of. term must be an addressable l-value. T -> *T
a[n] // indexing. returns the nth element of a. Possibly the nth item from its start address.
a.b // member access.

a as T // cast operator.

f(a, b, c, d) // call.

1 // unsized integer expression. iexpr
1u8 // integer with size suffix. in this case, u8

"hello" // string literal. [u8; N]
[expr for let iterator in iterable] // array comprehension. [T; N]
[expr; size] // array pad literal. [T; N]
[expr, expr, expr] // array literal. [T; N]
(a, b, c, d) // tuple literal (reserved but not implemented yet). (T, T2, T3, ..., TN)

a ~ b // concatenation [T; M] ~ [T; N] -> [T; M + N]
```

## Config Directives

Depending on the output file format selected for the program, there are extra options that can be configured.

```
config {
    option = value,
    option = value,
    option = value
}
```

See Formats section for possible options.

## Imports

To include another file in the program, use `import` directives.

```
import "path";
```

The path is a string literal. This path is the name of the .wiz file, without its extension.

Example:

```
import "nes";
import "magic";
```

## Embeds

To include a binary asset, use `embed` expressions.

```
embed "path"
```

The path passed to an `embed` should include the file extension. The contents of the embedded file are loaded into compiler memory and cached, and then inserted verbatim as a `[u8]` expression anywhere they are embedded.

Example:

```
const data = embed "hero.chr";
```
