Brainfuck Extended Set of Chars (BESC)

another dialect of an esoteric programming language, but with cardinal differences.

Brainfuck has capabilities only for console applications like a calculator, and my implementation in the future will have GUI capabilities, sound control, multithreading and external connections.

like a Swiss knife - bad opener, bad scissors, bad pliers, but always useful

## special chars:

```
+-<>,.[] ! `^ ()_ ${}
^        ^  ^  ^   ^
1        2  3  4   5
1. clasical Brainfuck
2. turbo mode
3. addict commands
```

### turbo mode

brainfuck:

```
++++++++++
```

besc:

```
!10+
```

this option can be used in bf

### addict commands

this char return pointer index to console:

```
`
```

---

moving the pointer to the cell value:

```
!100+^
```

is equal to

```
!100<
```

this char can adds dynamically
