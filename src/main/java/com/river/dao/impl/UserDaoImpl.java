package com.river.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


import com.river.dao.UserDao;
import com.river.domain.User;
@Repository("userDao")
public class UserDaoImpl implements UserDao{

	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	@Override
	public List<User> findUserByName(String name) {
		List<User> userList = jdbcTemplate.query(
				"SELECT ID,NAME,PWD FROM B_USER WHERE NAME = ?"
				, new UserMapper(), name);
		return userList;
	}
	
	@Override
	public List<Map<String,Object>> findBankName(){
		String sql = "SELECT ID,NAME,PID,URL FROM BANK_NAME";
		return jdbcTemplate.queryForList(sql);
	}
	

}
class UserMapper implements RowMapper<User>{

	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		User user = new User();
		user.setId(rs.getString("ID"));
		user.setName(rs.getString("NAME"));
		user.setPwd(rs.getString("PWD"));
		return user;
	}
}
