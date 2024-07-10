from .BFInterpret import BFI
from .managers import StdIOManager
from .structures import DynamicEnum


class BESCI(BFI):
    def __init__(self, dynamic_enum: DynamicEnum, stdIOManager: StdIOManager):
        BFI.__init__(self, dynamic_enum)

        self._stdIO = stdIOManager

    @property
    def input(self):
        pass

    @input.setter
    def input(self, inp: str):
        self._input_str = inp

    @property
    def code(self):
        pass

    @code.setter
    def code(self, code: str):
        self._code = code

    def run(self):
        self._stdIO.run(self._input_str)

        brackets_pos_map = self._get_brackets_pos_map(
            self._code, self.dinamic_enum)
        memory = self.memory
        pointer = 0

        timed_turbo = "0"
        is_turbo = False

        command_index = 0
        is_end = False
        max_iterations = \
            self.max_iterations if self.max_iterations is not None \
            else len(self._code) * len(self._input_str) * 1.5

        while not is_end:
            if command_index >= max_iterations or command_index >= len(self._code):
                break

            match self._code[command_index]:
                case "+":
                    memory[pointer] = \
                        (memory[pointer] + int(timed_turbo) or 1) % 256

                    if is_turbo:
                        is_turbo = False
                        timed_turbo = "0"
                case "-":
                    memory[pointer] = \
                        abs((memory[pointer] + int(timed_turbo) or 1) % 256)

                    if is_turbo:
                        is_turbo = False
                        timed_turbo = "0"
                case ">":
                    pointer += int(timed_turbo) or 1

                    if is_turbo:
                        is_turbo = False
                        timed_turbo = "0"
                case "<":
                    pointer -= int(timed_turbo) or 1

                    if is_turbo:
                        is_turbo = False
                        timed_turbo = "0"
                case "[":
                    if memory[pointer] == 0:
                        command_index = brackets_pos_map[command_index]

                case "]":
                    if memory[pointer] != 0:
                        command_index = brackets_pos_map[command_index]-1
                case "!":
                    is_turbo = True
                case r"[1-9]|0":
                    timed_turbo += self._code[command_index]
                case ",":
                    memory[pointer] = self._stdIO.cell
                case ".":
                    self._stdIO.cell = chr(memory[pointer])
                case "}":
                    self._stdIO.movPointer(int(timed_turbo) or 1)
                    if is_turbo:
                        is_turbo = False
                        timed_turbo = ""
                case "}":
                    self._stdIO.movPointer(-int(timed_turbo) or -1)
                    if is_turbo:
                        is_turbo = False
                        timed_turbo = ""

            command_index += 1

        self._stdIO.end()

    @property
    def output(self):
        return (self._stdIO.output)


besci = BESCI(DynamicEnum(), StdIOManager())
