# Using Wiz

Usage:

```sh
wiz [options] <input>
```

Arguments:

- `input` - the name of the input file to load. A filename of `-` implies the standard input stream.
- `-o filename` or `--output=filename` - the name of the output file to produce. the file extension determines the output format, and can sometimes automatically suggest a target system.
- `-m sys` or `--system=sys` - specifies the target system that the program is being built for. Supported systems: `6502`, `65c02` `rockwell65c02`, `wdc65c02`, `huc6280`, `z80`, `gb`, `wdc65816`, `spc700` 
- `-I dir` or `--import-dir=dir` - adds a directory to search for `import` and `embed` statements.
- `--color=setting` - sets the color preference for the terminal (Defaults to `auto`). `auto` will automatically detects if a TTY is attached, and only emits color escapes when there is one. `none` disables color. `ansi` will always use ANSI-escapes, even if no TTY is detected, or if the terminal uses different method of coloring (eg. Windows console).
- `--help` - lists a help message.
- `--version` - lists the current compiler version.

Example invocation:

```
wiz hello.wiz --system=6502 -o hello.nes
```

For now, please consult the example folder to see how Wiz can be used, or failing that, the compiler source code. Additional documentation isn't ready yet. In the future, there are plans to have a language reference, a reference for the instruction capabilities of each target, and tutorials showing how to make stuff. Help here is greatly appreciated!
