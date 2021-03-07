# Game Boy

## Miscellaneous

- `sizeof(*u8) = sizeof(u16)`
- `sizeof(far *u8) = sizeof(u24)`
- `carry` acts as a borrow flag in subtraction/comparison

## Registers

- `a : u8` - accumulator
- `b : u8`, `c : u8`, `d : u8`, `e : u8`, `h : u8`, `l : u8` - general registers
- `af : u16` - accumulator + flags pair
- `bc : u16`, `de : u8`, `hl : u8` - general register pairs
- `zero : bool` - the zero flag, used to indicate if the result of the last operation resulted in the value 0.
- `carry : bool` - the carry flag, used to indicate if the last operation resulted in a carry outside of the range 0 .. 255. For addition, the `carry` flag is `true` when an addition resulted in a carry, and `false` otherwise. For subtraction and comparison, the `carry` flag is `true` when there is a borrow (left-hand side was less than the right-hand side), and `false` otherwise. The `carry` also indicates the bit shifted out from a bit-shift operation.
- `interrupt : bool` - the interrupt enable flag, used to indicate whether maskable interrupts should be activated.

## Intrinsics

- `push(value)` - pushes a value to the stack.
- `pop()` - pops a value from the stack.
- `nop()` - does nothing, but takes 1 byte and 4 cycles.
- `halt()` - halts execution until the next interrupt occurs. saves CPU and battery.
- `stop()` - goes into a low-power sleep until a joy-pad interrupt occurs. also used after changing the Game Boy Color's speed to apply the change, by setting the joy-pad register to force an immediate wake.
- `decimal_adjust()` - corrects the result in the accumulator after performing arithmetic on packed binary-coded decimal (BCD) values. put a call to this after an addition or subtraction involving packed BCD values.
- `swap_digits(r)` - swaps the low and high nybbles of the register `r`.
- `debug_break()` - emits an `ld b, b` nop opcode can be used to triggers a breakpoint in the Game Boy emulator BGB.
- `bit(r, n)` - test bit `n` of the register `r`, and updates the `zero` flag.
- `cmp(left, right)` - compares two values, by performing a subtraction without storing the result in memory. `zero` indicates whether `left == right`, `carry` indicates whether `left < right`.

## Addressing Modes

- TODO

## Instructions

```
TODO
```

## Documentation

TODO
