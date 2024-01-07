const listAllTables = async () => {
  try {
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
    `;

    const [result] = await db.query(query);

    if (result.length > 0) {
      const tables = result.map((row) => row.table_name);
      console.log("List of tables:", tables);
    } else {
      console.log("No tables found in the database.");
    }
  } catch (error) {
    console.error("Error listing tables:", error);
  }
};

module.exports = listAllTables;
