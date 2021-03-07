# Zilog Z80

## Miscellaneous

- `sizeof(*u8) = sizeof(u16)`
- `sizeof(far *u8) = sizeof(u24)`
- `carry` acts as a borrow flag in subtraction/comparison

## Registers

- `a : u8` - accumulator
- `b : u8`, `c : u8`, `d : u8`, `e : u8`, `h : u8`, `l : u8` - general registers
- `ixh : u8`, `ixl : u8`, `iyh : u8`, `iyl : u8` - index register sub-registers (undocumented)
- `af : u16` - accumulator + flags pair
- `bc : u16`, `de : u8`, `hl : u8` - general register pairs
- `ix : u16`, `iy : u8` - index registers
- `zero : bool` - the zero flag, used to indicate if the result of the last operation resulted in the value 0.
- `carry : bool` - the carry flag, used to indicate if the last operation resulted in a carry outside of the range 0 .. 255. For addition, the `carry` flag is `true` when an addition resulted in a carry, and `false` otherwise. For subtraction and comparison, the `carry` flag is `true` when there is a borrow (left-hand side was less than the right-hand side), and `false` otherwise. The `carry` also indicates the bit shifted out from a bit-shift operation.
- `overflow : bool`
- `negative : bool`
- `interrupt : bool` - the interrupt enable flag, used to indicate whether maskable interrupts should be activated.
- `interrupt_mode : u8`
- `interrupt_page : u8`
- `memory_refresh : u8`

## Intrinsics

- `push(value)`
- `pop()`
- `nop()`
- `halt()`
- `decimal_adjust()`
- `swap(left, right)`
- `swap_shadow()`
- `load_increment()`
- `load_decrement()`
- `load_increment_repeat()`
- `load_decrement_repeat()`
- `bit`
- `cmp`
- `comare_increment`
- `comare_decrement`
- `comare_increment_repeat`
- `comare_decrement_repeat`
- `rotate_left_digits`
- `rotate_right_digits`
- `io_read`
- `io_read_increment`
- `io_read_decrement`
- `io_read_increment_repeat`
- `io_read_decrement_repeat`
- `io_write`
- `io_write_increment`
- `io_write_decrement`
- `io_write_increment_repeat`
- `io_write_decrement_repeat`
- `decrement_branch_not_zero`

## Addressing Modes

- TODO

## Instructions

```
TODO
```

## Documentation

TODO
