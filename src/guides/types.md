# Types

## Built-in Types

```wiz
// Boolean
bool
// Compie-time integer expression ("arbitrary precision", unknown size, but currently 128-bit)
iexpr
// Unsigned sized integer
u8
u16
u24
u32
u64
// Signed sized integer
i8
i16
i24
i32
i64
```

## Array Types

```wiz
// Array. eg. [u8; 100]
[T; N]
// Implicitly-sized array type. (size determined by initializer)
[T]
```

## Designated Storage Types

```wiz
// Designated storage for parameter-passing and named locals.
// eg. u8 in a
T in expr
```

## User-defined Types

```wiz
// Structure. Data members have increasing start addresses.
struct Point {
    x : u8,
    y : u8
}

// Union. Data members have the same start address.
union Union {
    byte : u8,
    word : u16
}

// Enum. A strongly-typed enumeration type.
// Uses the same storage as its underlying type.
// It cannot be used as integer without casting.
enum ItemType : u8 {
    Consumable,
    Key,    
    Weapon,
    Armor,
    Accessory,
}

// Type alias. Gives another name to the same type.
// A typealias is interchangable with the type it aliases.
typealias byte = u8;
```
