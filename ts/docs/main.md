## special chars:

```
+-<>,.[] ! `^ ${} ()_
^        ^  ^  ^   ^
1        2  3  4   5

1. clasical Brainfuck
2. turbo mode
3. addict commands
4. memory bank management
5. chains of actions
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

this option can be used in bf too

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
!50+      runner cell + 50, used turbo
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

### chains

its chains of actions. Like a asynchronous programming or threads, but isnt this.

<!-- the chain has its own memory, but -->

```
( ) _ |
^ ^ ^ ^
1 2 3 4
1.chain start
2.chain end
3.launch chain
4.stopper
```

the chain can be implemented by a thread, or asynchronous programming (depends on the interpreter/compiler)

```
(
  !35>!35+.
)_
!36+.
```

maybe output = \#\$
maybe output = \$\#

---

if there is another mem. managers (like graphical, sound... etc)
and if this mem bank is selected
the management of this goes to chain

managers=[
stdIO,
Arithmetic,
graphical
]

```
$$
!10+. to graphical

()_ now graphical can be used only in this chain
$$
!10+. to stdIO
```

---

##### stopper

if you need to link two chains you can use stopper. He is stops the chain until the cell of the main stream is equal to 1.

example:

```
(
   $$
  !10+.
  !2>
  |
  !12.
)_

something

>+ chain do not work
>>+ chain is work
```
