package com.river.dao;

import java.util.List;
import java.util.Map;

import com.river.domain.User;

public interface UserDao {

	List<User> findUserByName(String name);
	
	List<Map<String,Object>> findBankName();
}
