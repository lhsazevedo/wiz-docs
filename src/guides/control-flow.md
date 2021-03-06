# Control Flow

## If Statement

An `if` statement allows a block of code to be executed conditionally. The condition of an `if` statement is some expression of type `bool`. If a condition evaluates to `true`, then the block directly following it is executed. Otherwise, the block immediately following the condition is skipped, and the next alternative delimited by an `else if` is evaluated. Finally, there is `else` when all other alternatives have evaluated to `false`.

```wiz
if condition {
    statements;
} else if condition {
    statements;
} else {
    statements;
}
```

A conditional expression can be a register term of type `bool` or its negation, or some combination of multiple `bool` operands with `&&` and `||` operators

Example:

```wiz
a = hp;
if zero {
    dead();
}
```

There are also high-level operators for comparison: `==`, `!=`, `<`, `>=`, `>`, `<=`. Which kinds of comparisons are possible, and which registers can perform comparisons, depends on the target system.

Example:

```wiz
a = gold;
x = item_index;

if a >= item_cost[x] {
    a -= item_cost[x];
    gold = a;
    buy_item(x);
} else {
    not_enough();
}
```

A conditional statement can also use "side-effect expressions" that evaluate some operation as required before a conditional expression. This sort of "setup-and-test" conditional can make some code read better, used carefully.

Example:

```wiz
if { a = attack - defense; } && (carry || zero) {
    block_attack();
}
```

It is possible to use bit-indexing `$` to test a single-bit of a value and get its boolean result. Which registers are capable of this, as well as the bits that can be selected, depends on the target system.

Example:

```wiz
if b$7 {
    vertical_flip();
} else if b$6 {
    horizontal_flip(); 
}
```

## While Statement

A `while` statement allows a block of code to be executed conditionally 0 or more times. The block is repeated as long as the condition provided still evaluates to `true`.

```wiz
while condition {
    statement;
    statement;
    statement;
}
```

Example:

```wiz
x = count;
while !zero {
    beep();
    x--;
}
```

## Do/While Statement

A `do` ... `while` statement allows a block of code to be executed unconditionally once, followed by conditional execution 0 or more times. The block is entered once, and will repeat more times as long as the condition provided still evaluates to `true`.

```wiz
do {
    statement;
    statement;
    statement;
} while condition;
```

Note that `do` ... `while` statements are slightly more efficient than `while` statements, because they fall-through to the next code once the condition is `false`, and only jump to the top of the loop if the condition is still `true`.

## For Statement

A `for` statement allows iteration over a sequence of values, and executes a block of code for each step through the sequence.

```wiz
for iterator in iterable {
    statement;
    statement;
    statement;
}
```

Currently, `for` loops only support iteration on comple-time integer ranges.

```wiz
for counter in start .. end {
    statement;
    statement;
    statement;
}

for counter in start .. end by step {
    statement;
    statement;
    statement;
}
```

Example:

```wiz
for x in 0 .. 31 {
    beep();
}
```


`start .. end` is an inclusive range. If the loop terminates normally, then after the loop, the counter provided will have the first value that is outside of the sequence.

Example:

```
// x is a u8 register that can be incremented and decremented.

// x will now be 32.
for x in 0 .. 31 {
    // ...
}

// x will be 0 after the loop.
for x in 31 .. 0 by -1 {
    // ...
}

// x will be 0 after the loop.
for x in 0 .. 255 {
    // ...
}
```

## Inline For Statement

An `inline for` allows unrolling a loop at compile-time. The iterator of the loop is optional but exists only for the scope of the `inline for` block. The value of the iteration at each iteration can be used by expressions within the loop.

```wiz
inline for let iterator in iterable {
    statement;
    statement;
    statement;
}

inline for in iterable {
    statement;
    statement;
    statement;
}
```

Unlike a normal `for` statement, other iterables like arrays can be used as an iterable.

Example:

```wiz
inline for let i in 1 .. 3 {
    hoot(i);
}

inline for in 1 .. 100 {
    nop();
}

inline for let i in [1, 2, 8, 10, 5, 3, 1] {
    y = i;
    draw();
}
```

## Goto Statements

A `goto` is a low-level form of branching which jumps to another part of the program. Most high-level control structures are internally implemented in terms of `goto`.

```wiz
goto destination;
goto destination if condition;
```

The destination of a `goto` can be a label, a function, or a function pointer expression.

Example:

```wiz
x--; goto there if zero;

loop:
    goto loop;

there:
```

Code that uses `goto` should ensure that everything is already set up correctly before branching, because `goto` does not pass any arguments to its destination. If a `goto` that passes arguments to a function is required, use a tail-call statement of form `return f(arg, arg, arg)` instead.

## Break and Continue

Loop statements such as `while`, `do` ... `while`, `for` have two forms of branching statements in their blocks: `break` and `continue`.

```wiz
break;
continue;
break if condition;
continue if condition;
```

A `break` statement will terminate a loop early, and jump ahead to the code that immediately follows a loop's block.

A `continue` statement will skip to the next iteration of the loop. In `for` loops, this will skip to the code that performs an increment and branch. In `while` and `do` ... `while` loops, this will skip to the conditional branch of the loop.
