export const cpp: string[] = [
  "template<typename T>\nT max(T a, T b) {\n    return (a > b) ? a : b;\n}",
  "std::vector<int> nums = {1, 2, 3, 4, 5};\nauto it = std::find_if(nums.begin(), nums.end(), [](int n) { return n % 2 == 0; });",
  "class Singleton {\nprivate:\n    static Singleton* instance;\n    Singleton() {}\npublic:\n    static Singleton* getInstance() {\n        if (!instance) instance = new Singleton();\n        return instance;\n    }\n};",
  "int* ptr = new int(42);\nstd::unique_ptr<int> uptr = std::make_unique<int>(42);\nstd::shared_ptr<int> sptr = std::make_shared<int>(42);",
  "std::map<std::string, int> scores;\nscores[\"alice\"] = 95;\nscores[\"bob\"] = 87;\nfor (const auto& [name, score] : scores) {\n    std::cout << name << \": \" << score << '\\n';\n}",
];
