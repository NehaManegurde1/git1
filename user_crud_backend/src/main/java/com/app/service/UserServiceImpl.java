package com.app.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	// depcy
	@Autowired
	private UserDao userDao;


	@Override
	public List<User> getAllUser() {

		return userDao.findAll();
	}

	@Override
	public User addNewUser(User transientUser) {
		// CrudRepository method : T save (T entity)
		return userDao.save(transientUser);
	}// rets DETACHED emp to the caller

	@Override
	public User getUserDetails(Long userId) {
		// TODO Auto-generated method stub
		return userDao.findById(userId).orElseThrow(() 
				-> new ResourceNotFoundException("Invalid user id !!!!"));
	}
	// in case of valid id : rets DETACHED emp
	// in case of invalid id : throws Custom exc

	@Override
	public User updateUser(User detachedUser) {
		// chk if emp exists
		if(userDao.existsById(detachedUser.getId())) {//select
			//exists --update
			return userDao.save(detachedUser);
		}
		throw new ResourceNotFoundException("Invalid User id !!!!");
	}//tx.commit() --> update query

	@Override
	public String deleteUser(Long userId) {
		if(userDao.existsById(userId))
		{
			userDao.deleteById(userId);
			return "deleted user details...";
		}
		return "deletion of emp details failed !!!!!";
	}//tx.commit() --> delete
	@Override
	public User findByEmailAndPassword(String email, String password) {
	    return userDao.findByEmailAndPassword(email, password);
	}
	
	

	  @Autowired
	    private DataSource dataSource;  // Autowire the DataSource

	    private JdbcTemplate jdbcTemplate;

	    @PostConstruct
	    public void init() {
	        // Initialize JdbcTemplate in the @PostConstruct method
	        this.jdbcTemplate = new JdbcTemplate(dataSource);
	    }

	    @Override
	    public List<String> getAllTableNames() {
	        if (jdbcTemplate == null) {
	            throw new IllegalStateException("JdbcTemplate is not initialized.");
	        }
	        String sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'user1s1'";
	        return jdbcTemplate.queryForList(sql, String.class);
	    }
	    ///////////////////////////////////////////////////////////////////////////////////////////////////////
	    @SuppressWarnings("deprecation")
		@Override
	    public Long countNullValuesInTable(String tableName) {
	        long totalNullCount = 0;

	        // Validate the table name
	        if (tableName == null || tableName.trim().isEmpty()) {
	            throw new IllegalArgumentException("Table name must not be empty");
	        }

	        // Define the schema where your table is located
	        final String schema = "user1s1";

	        // SQL query to check if the table exists
	        String checkTableExistsSql = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?";

	        // Ensure table exists
	        Integer tableExists;
	        try {
	            tableExists = jdbcTemplate.queryForObject(checkTableExistsSql, new Object[]{tableName, schema}, Integer.class);
	        } catch (Exception e) {
	            throw new RuntimeException("Error checking table existence: " + tableName, e);
	        }

	        if (tableExists == null || tableExists == 0) {
	            throw new RuntimeException("Table does not exist: " + tableName);
	        }

	        // SQL query to get column names for the specified table
	        String columnsSql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?";

	        // Fetch the list of columns
	        List<String> columns;
	        try {
	            columns = jdbcTemplate.query(columnsSql, new Object[]{tableName, schema}, new RowMapper<String>() {
	                @Override
	                public String mapRow(ResultSet rs, int rowNum) throws SQLException {
	                    return rs.getString("COLUMN_NAME");
	                }
	            });
	        } catch (Exception e) {
	            throw new RuntimeException("Error retrieving columns from table: " + tableName, e);
	        }

	        if (columns == null || columns.isEmpty()) {
	            throw new RuntimeException("No columns found for table: " + tableName);
	        }

	        // Iterate over columns and count NULL values
	        for (String column : columns) {
	            // Construct SQL query to count NULL values for the column
	            String sql = String.format("SELECT COUNT(*) FROM `%s`.`%s` WHERE `%s` IS NULL", schema, tableName, column);

	            Long count;
	            try {
	                count = jdbcTemplate.queryForObject(sql, Long.class);
	            } catch (Exception e) {
	                // Logging the error and continuing with the next column
	                System.err.println("Error counting NULL values in column: " + column + " - " + e.getMessage());
	                // Optionally: Log the full SQL for debugging
	                System.err.println("Failed SQL: " + sql);
	                continue; // Continue with the next column
	            }

	            if (count != null) {
	                totalNullCount += count;
	            }
	        }

	        return totalNullCount;
	    }
	    
	    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  @Override
	    public Long countRowsWithZeroInAllColumns(String tableName) {
	        if (tableName == null || tableName.trim().isEmpty()) {
	            throw new IllegalArgumentException("Table name must not be empty");
	        }

	        final String schema = "user1s1"; // Replace with your schema name

	        // SQL query to get column names for the specified table
	        String columnsSql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?";

	        // Fetch the list of columns
	        List<String> columns;
	        try {
	            columns = jdbcTemplate.queryForList(columnsSql, new Object[]{tableName, schema}, String.class);
	        } catch (Exception e) {
	            throw new RuntimeException("Error retrieving columns from table: " + tableName, e);
	        }

	        if (columns == null || columns.isEmpty()) {
	            throw new RuntimeException("No columns found for table: " + tableName);
	        }

	        // Construct SQL query to count rows where all columns have value 0
	        StringBuilder sqlBuilder = new StringBuilder("SELECT COUNT(*) FROM `")
	            .append(schema)
	            .append("`.`")
	            .append(tableName)
	            .append("` WHERE ");

	        for (int i = 0; i < columns.size(); i++) {
	            String column = columns.get(i);
	            sqlBuilder.append("`").append(column).append("` = 0");
	            if (i < columns.size() - 1) {
	                sqlBuilder.append(" AND ");
	            }
	        }

	        String sql = sqlBuilder.toString();

	        Long count;
	        try {
	            count = jdbcTemplate.queryForObject(sql, Long.class);
	        } catch (Exception e) {
	            throw new RuntimeException("Error counting rows where all columns are 0 in table: " + tableName, e);
	        }

	        return count != null ? count : 0;
	    }
	 	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
}