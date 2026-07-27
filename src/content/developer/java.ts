export const java: string[] = [
  "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
  "List<String> items = new ArrayList<>();\nitems.stream()\n    .filter(s -> s.startsWith(\"A\"))\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());",
  "public interface Repository<T, ID> {\n    Optional<T> findById(ID id);\n    List<T> findAll();\n    T save(T entity);\n    void deleteById(ID id);\n}",
  "try (Connection conn = dataSource.getConnection()) {\n    PreparedStatement stmt = conn.prepareStatement(\"SELECT * FROM users WHERE id = ?\");\n    stmt.setInt(1, userId);\n    ResultSet rs = stmt.executeQuery();\n} catch (SQLException e) {\n    logger.error(\"Database error\", e);\n}",
  "@Entity\n@Table(name = \"users\")\npublic class User {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    @Column(nullable = false)\n    private String name;\n    @Column(unique = true)\n    private String email;\n}",
];
