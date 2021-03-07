# Rockwell 65C02

The Rockwell 65C02 is like the MOS 65C02, but also has some extra instructions.

## Extra Instructions

```wiz
goto {-128..127} if *({0..255} as *u8) $ {0..7}
goto {-128..127} if !(*({0..255} as *u8)) $ {0..7}
^goto {0..65535} if *({0..255} as *u8) $ {0..7}
^goto {0..65535} if !(*({0..255} as *u8)) $ {0..7}

*({0..255} as *u8) $ {0..7} = false
*({0..255} as *u8) $ {0..7} = true
```
