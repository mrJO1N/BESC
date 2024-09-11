from re import finditer
from .structures import DynamicEnum

# class I_runtime_vars:
#     def __init__(self,brackets_pos_map:DynamicEnum):
#         pass


class BFI:
    def __init__(self, dynamic_enum):
        self.memory = [0] * 30000
        self._code = ""
        self.__output = ''
        self._input_str = ""
        self.max_iterations = None
        self.dinamic_enum = dynamic_enum

    def set_input(self, input_str: str):
        self._input_str = input_str

    def set_code(self, code: str):
        self._code = code

    def _make_bf_step(self, brackets_pos_map, command, memory, pointer, input_str, output_str, last_input_index):
        match command:
            case "+":
                memory[pointer] = \
                    (memory[pointer] + 1) % 256
            case "-":
                memory[pointer] = \
                    abs((memory[pointer] + 1) % 256)
            case ">":
                pointer += 1
            case "<":
                pointer -= 1
            case ",":
                if last_input_index < len(input_str):
                    memory[pointer] = ord(
                        input_str[last_input_index])
                    last_input_index += 1
                else:
                    memory[pointer] = 0
            case ".":
                output_str += chr(memory[pointer])
            case "[":
                if memory[pointer] == 0:
                    command_index = brackets_pos_map[command_index]

            case "]":
                if memory[pointer] != 0:
                    command_index = brackets_pos_map[command_index] - 1

        return memory, pointer, output_str, last_input_index

    def run(self, max_iterations: int):
        brackets_pos_map = self._get_brackets_pos_map(
            self._code, self.dinamic_enum)

        pointer = 0
        last_input_index = 0
        command_index = 0

        is_end = False
        max_iterations = \
            max_iterations if self.max_iterations is not None \
            else len(self._code) * len(self._input_str) * 1.5

        while not is_end:
            if command_index >= max_iterations or command_index >= len(self._code):
                break

            self.memory, pointer, self.__output, last_input_index = \
                self._make_bf_step(
                    brackets_pos_map,
                    self._code[command_index],
                    self.memory, pointer,
                    self._input_str,
                    self.__output,
                    last_input_index
                )

            command_index += 1
        return self

    def get_output(self):
        return self.__output

    def _get_brackets_pos_map(self, code, dynamic_enum) -> DynamicEnum:
        brackets_pos_map = dynamic_enum
        timed = list(finditer(r"\[", code)), list(finditer(r"\]", code))

        brackets_matchs = {
            "[": [timed[0][i].start() for i in range(len(timed[0]))],
            "]": [timed[1][i].start() for i in range(len(timed[1]))],
        }

        for i in range(len(brackets_matchs["["])):
            brackets_pos_map + \
                {brackets_matchs["["][i]: brackets_matchs["]"][i]}
        return brackets_pos_map


bfi = BFI(dynamic_enum=DynamicEnum())
