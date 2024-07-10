from abc import ABC, abstractmethod


class MemBankManager(ABC):
    def __init__(self):
        self.memory = [0] * 30000
        self.pointer = 0

    def movPointer(self, changeNum: int):
        self.pointer += changeNum

    def get_cell(self):
        return self.memory[self.pointer]

    def set_cell(self, value: int):
        self.memory[self.pointer] = value

    @abstractmethod
    def run(self):
        pass

    @abstractmethod
    def end(self):
        pass


class StdIOManager(MemBankManager):
    # [ input<list[15_000]>, output<list[15_000]> ]
    def __init__(self):
        MemBankManager.__init__(self)
        self._output = ""
        self.io_separatorIndex = 15_000  # use for separate input and output

    def run(self, input_str: str):
        for i in range(len(input_str)):
            char = input_str[i]
            self.memory[i] = ord(char)

    @property
    def cell(self):  # on read input
        cell = self.memory[self.pointer]
        self.pointer += 1
        return cell

    @cell.setter
    def cell(self, value: int):
        self.memory[self.pointer+self.io_separatorIndex] = value
        print("kkkkkkk", self.pointer+self.io_separator)

    def end(self):
        mem = self.memory[self.io_separatorIndex:][::-1]

        for char in mem:
            if char != 0:
                mem = (mem[mem.index(char):][::-1])
                break

        for char in mem:
            try:
                self._output += chr(char)
            except TypeError:
                break
        self._output = self._output.replace("\x00", "")

    @property
    def output(self):
        return self._output
