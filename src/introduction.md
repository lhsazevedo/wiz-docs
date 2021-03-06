# Introduction

## What is Wiz?

Wiz is intended to cross-compile programs that run on specific hardware, as opposed to an abstract machine which requires a runtime library to support it. This means programs must be written with the feature set and limitations of the system being targeted in mind (registers, addressing modes, limitations on instructions), and programs are highly platform-dependent.


## Features

Here are some features that Wiz supports:

- Familiar high-level syntax and structured programming features, such as `if`, `while`, `for`, `do`/`while`, functions, etc.
- Static type system that supports integers, structures, arrays, pointers, and other types. Supports automatic type inference for initializers.
- Expressions and statements that map directly to low-level instructions.
- Raw access to the hardware. Low-level register and memory access, branching, stack manipulation, comparison, bit-twiddling, I/O, etc.
- Compile-time attributes, inlining, constant expression folding, conditional compilation, array comprehensions.
- Support for multiple different systems and output file formats.
- `bank` declarations to customize memory map and output.
- `const` and `writeonly` modifiers to prevent undesired access to memory.

Wiz supports several different CPU architectures, with hopes to support more platforms in the future!

- `6502` - MOS 6502 (used by the NES, C64, Atari 2600/5200/7800/8-bit, Apple II)
- `65c02` - MOS 65C02
- `wdc65c02` - WDC 65C02
- `rockwell65c02` - Rockwell 65C02
- `huc6280` - HuC6280 (used by the PC Engine / TurboGrafx-16)
- `wdc65816` - WDC 65816 (used by the SNES, SA-1, Apple IIgs)
- `spc700` - SPC700 (used by the SNES APU)
- `z80` - Zilog Z80 (used by the Sega Master System, Game Gear, MSX, ZX, etc)
- `gb` - Game Boy CPU / DMG-CPU / GBZ80 / SM83 / LR35902 (used by the Game Boy and Game Boy Color)

Wiz has built-in support for many ROM formats, and provides conveniences for configuring headers, and for automatically filling in checksums and rounding up ROM sizes. In some case the CPU architecture can be automatically detected by the output format. It currently exports the following output formats:

- `.bin` (raw binary format -- supports optional trimming)
- `.nes` (NES / Famicom - header config, auto-pad)
- `.gb`, `.gbc` (Game Boy - header config, auto-checksum, auto-pad)
- `.sms`, `.gg` (Sega Master System - header config, auto-checksum, auto-pad) 
- `.sfc`, `.smc` (SNES / Super Famicom - header config, auto-checksum, auto-pad)
- `.pce` (TurboGrafx-16 / PC Engine)
- `.a26` (Atari 2600)
