class DynamicEnum():
    def __init__(self, obj: dict[int, int] = {}):
        self.enum = obj or {}

    def __add__(self, obj: dict[int, int]):
        key = list(obj.keys())[0]
        val = list(obj.values())[0]
        self.enum[key] = val

    def __sub__(self, key_or_val: int) -> 'DynamicEnum':
        if key_or_val in self.enum.keys():
            del self.enum[key_or_val]
        elif key_or_val in self.enum.values():
            del self.enum[self[key_or_val]]

    def __getitem__(self, key_or_val: int) -> int:
        answer = self.enum.get(key_or_val, -1)
        if answer == -1:
            keys = list(self.enum.keys())
            vals = list(self.enum.values())

            for valIndex in range(len(vals)):
                if vals[valIndex] == key_or_val:
                    answer = keys[valIndex]
        return answer
