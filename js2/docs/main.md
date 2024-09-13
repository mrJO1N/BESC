## special chars:

```
+-<>,.[] ! `^ ${} ()_
^        ^  ^  ^   ^
1        2  3  4   5

1. clasical Brainfuck
2. turbo mode
3. addict commands
4. memory bank managers
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
` (backquote)
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

this char adds dynamically

### memory managers

this is used to expand the possibilities.

for example, to control the screen you do not need to know the the operating system, or the platform, it is enough to know how to manage the memory of the manager who controls the screen.

example with Arithmetic manager:

```

$         switch manager to next
}}        manager pointer + 2
!50+      runner cell + 50 used turbo
.         write from runner cell to manager cell
[-]       cicle to runner cell = 0
}
!10+. [-]
!2{       manager pointer - 2 used turbo
+. [-]
{
+.
,         write from manager cell to runner cell
$.
```
