# Formats

## Binary

The default format for any program being output. Wiz peforms no special header or footer handling.

### Config options

- `trim` (bool) - if `true`, then the unused portion at the end of final bank in the output will be trimmed from the file. Useful for shortening the size of binaries that are going to be embedded in another program. (Defaults to `false`)

## Nintendo Entertainment System / Famicom

The iNES format is an emulator format for NES ROMs that is commonly supported. It has the `.nes` file extension.

### Format Specifics

- 16-byte iNES header at the start of the output binary
- PRG banks defined by `constdata` or `prgdata` bank. Padded to nearest multiple of 16 KiB.
- CHR banks defined by `chrdata` banks. Padded to nearest multiple of 8 KiB.

### Config Options

- `cart_type` (string) - the type of cartridge that the cart is using. It can be one of the following strings:

```
"nrom"
"sxrom"
"mmc1"
"uxrom"
"cnrom"
"txrom"
"mmc3"
"mmc6"
"exrom"
"mmc5"
"axrom"
"pxrom"
"mmc2"
"fxrom"
"mmc4"
"color-dreams"
"cprom"
"24c02"
"ss8806"
"n163"
"vrc4a"
"vrc4c"
"vrc2a"
"vrc2b"
"vrc4e"
"vrc6a"
"vrc4b"
"vrc4d"
"vrc6b"
"action-53"
"unrom512"
"bnrom"
"rambo1"
"gxrom"
"mxrom"
"after-burner"
"fme7"
"sunsoft5b"
"codemasters"
"vrc3"
"vrc1"
"n109"
"vrc7"
"gtrom"
"txsrom"
"tqrom"
"24c01"
"dxrom"
"n118"
"n175"
"n340"
"action52"
"codemasters-quattro"
```

- `cart_type_id` (integer) - the type of cartridge that the cart is using, as an iNES mapper number. Takes precedence over `cart_type_id`, so use this if `cart_type` is not recognized. (If a cart type name is missing, feel free to request it!)
- If neither `cart_type` nor `cart_type_id` are specified, then the cart is NROM (mapper 0). This no special memory mapper, so it is limited to a view of 32K of ROM at addresses 0x8000 .. 0xFFFF in memory.
- `vertical_mirror` (bool) - whether or not this cart uses vertical mirroring. (Defaults to `false`)
- `battery` (bool) - whether or not this cart uses battery backed save RAM. (Defaults to `false`)
- `four_screen` (bool) - whether or not this cart contains RAM for extra nametables, allowing use of all four screens without PPU nametable mirroring. (Defaults to `false`)
- `prg_ram_size` (integer) - the number of bytes to use for PRG RAM. Must be divisble by 8192 bytes, and can be no more than 2088960 bytes (8192 bytes * 255 banks). (Defaults to 0)

## Game Boy

The Game Boy has a standardized header format that is is contained a fixed location in ROM. The file format on disk has a `.gb` extension. Wiz will automatically fill in the necessary fields to get a basic booting Game Boy ROM. This includes the Nintendo logo image, and the checksum, necessary to get past the boot screen of the Game Boy.

### Format Specifics

- 0x100 .. 0x150 in the first bank of ROM will be reserved for the Game Boy header.
- A checksum is automatically calculated and inserted into the header.
- The program ROM is automatically padded to nearest size permitted by the Game Boy header format.

### Config options

- `cart_type` (string) - the type of cartridge that the cart is using. It can be one of the following strings:

```
"rom"
"mbc1"
"mbc1-ram"
"mbc1-ram-battery"
"mbc2"
"mbc2-battery"
"rom-ram"
"rom-ram-battery"
"mmm01"
"mmm01-ram"
"mmm01-ram-battery"
"mbc3-timer-battery"
"mbc3-timer-ram-battery"
"mbc3"
"mbc3-ram"
"mbc3-ram-battery"
"mbc4"
"mbc4-ram"
"mbc4-ram-battery"
"mbc5"
"mbc5-ram"
"mbc5-ram-battery"
"mbc5-rumble"
"mbc5-rumble-ram"
"mbc5-rumble-ram-battery"
"mmm01"
"camera"
"tama5"
"huc3"
"huc1"
```

- `cart_type_id` (integer) - the type of cartridge mapper that the cart is using, as a numeric ID used by the Game Boy header format. Takes precedence over `cart_type_id`, so use this if `cart_type` is not recognized. (If a cart type name is missing, feel free to request it!)
- If neither `cart_type` nor `cart_type_id` are specified, then the ROM has no memory bank controller, and it is limited to a view of 32K of ROM at addresses 0x0000 .. 0x7FFF in memory.
- `title` (string) - The name of the program. The max length is 11 if there is `manufacturer` code, and 15 on legacy carts that do not have one. (Defaults to the output filename with extension removed, truncated to the maximum length requirement of the title)
- `gbc_compatible` (bool) - Whether or not this cart is compatible with Game Boy Color features. If `true`, the cart will boot with Game Boy Color functionality when played on a Game Boy Color compatible system. A GBC-compatible game can still be played on an original DMG-compatible model of Game Boy. (Defaults to `false`)
- `gbc_exclusive` (bool) - Whether or not this cart is exclusive to the Game Boy Color. If `true`, the cart will boot with Game Boy Color functionality when played on a Game Boy Color compatible system. Takes precedence over `gbc_compatible` if it is `true`. A GBC-exclusive game should not be played on an original DMG-compatible model of Game Boy. However, it is still up to the program to detect if it is being played on a Game Boy Color system, and stop if an incompatible system is used. (Defaults to `false`)
- `sgb_compatible` (bool) - Whether or not this cart is compatible with Super Game Boy features. If `true`, the cart is able to use extra functionality on a Super Game Boy, allowing communication with the Super Game Boy program through the Game Boy joypad port. Most emulators will expect a SGB border to be uploaded if this flag is enabled. (Defaults to `false`)
- `ram_size` (integer) - The amount of on-cartridge RAM that this cart has available. (Defaults to 0) Must be a size that is supported by the Game Boy header format. Possible values include:

```
0
2048
8192
32768
65536
131072
```

- `international` (bool) - Whether or not this game is an international release outside of Japan. (Defaults to `false`)
- `licensee` (string) - A two-character string representing the licensee / creator of the game. (Defaults to `""`)
- `old_licensee` (integer) - A legacy licensee code indicating the ID of the licensee / creator of this game. All newer releases have a legacy licensee code of 0x33 and will not use this field. (defaults to 0x33)
- `version` (integer) - The version of the cart being released, which can be used to tell apart later revisions. (Defaults to 0)

## Sega Master System / Game Gear

The Sega Master System and Game Gear are very similar game systems, and both share the same header format. Sega Master System ROMs end in an `.sms` extension. Game Gear ROMs end in a `.gg` extension.

### Format specifics

- Depending on the size of the cart, there is a header at either 0x1FF0 (8 KiB ROMs), 0x3FF0 (16 KiB ROMs), or 0x7FF0 (32 KiB ROMs).
- The program ROM is automatically padded to either 8 KiB, 16 KiB, or 32 KiB if it is not aligned to one of these sizes.
- A checksum is automatically calculated and inserted into the header.

### Config Options

- `product_code` (integer) - a number between 0 and 159999 indicating the product code of this cart. (Defaults to 0)
- `version` (integer) - a version number for this cart release, between 0 and 15. (Defaults to 0)
- `region` - The region that this cart is being released for. (Defaults to `"international"`)

```
"japan"
"export"
"international"
```

## Super Nintendo Entertainment System / Super Famicom

The SNES has a common header format found at fixed location in the ROM. The preferred format for SNES ROMs nowadays is `.sfc`, which contains no redundant copier headers to speak of, only the necessary headers to run the game.

There is additionally `.smc`, a common format popularized by the Super Magicom copier. Wiz will add an extra 512 bytes to work as this SMC format.

When possible prefer `.sfc`, but `.smc` is here for those who want headered ROMs.

### Format Specifics

- Depending on the map mode of the cart, there is a SNES header at either 0x7F00 (lorom) or 0xFF00 (hirom).
- A checksum is automatically calculated and inserted into the header.
- The program ROM is automatically padded to at least 128 KiB, and then to the nearest power of two from that.
- For now, you need to import the ROM before you can use it with higan or older versions of bsnes, but maybe down the road there will be a direct export to game folders.

### Config options

- `map_mode` (string) - The type of memory mapping mode that this cart uses (Defaults to `"lorom"`)

```
"lorom"
"hirom"
"sa1"
"sdd1"
"exhirom"
"spc7110"
```

- `fastrom` (bool) - Whether or not this cart uses fast ROM, which . (Defaults to `false`)
- `expansion_type` (string) - The expansion hardware type that this cart uses. (Defaults to `"none"`)

```
"none"
"dsp"
"super-fx"
"obc1"
"sa1"
"other"
"custom"
```

- `maker_code` (string) - two character code used to designate the licensee / creator of the game. (Defaults to `""`)
- `game_code` (string) - four character code used to designate this game. (Defaults to `""`)
- `region` (string) - the region of the world that this is being released for. This region also indicates NTSC/PAL of the game. (Defaults to `"japanese"` NTSC game)

```
"ntsc"
"pal"
"japanese"
"american"
"european"
"scandinavian"
"french"
"dutch"
"spanish"
"german"
"italian"
"chinese"
"korean"
"canadian"
"brazilian"
"australian"
```

- `ram_size` (integer) - the size in bytes of on-cartridge RAM that this cart uses. If non-zero, the size must be power of two and greater than 4096 bytes. (Defaults to 0)
- `expansion_ram_size` (integer) - the size in bytes of on-cartridge RAM that the expansion uses. If non-zero, the size must be power of two and greater than 4096 bytes. (Defaults to 0)
- `battery` (bool) - whether or not this cart uses battery backed save RAM. (Defaults to `false`)
- `special_version` (integer) - the special version of this cart. (Defaults to 0)
- `cart_subtype` (integer) - the sub-type identifier to use for this cart. (Defaults to 0)
- `title` (string) - The title of the cart, as a 21-character string. (Defaults to `""`)
