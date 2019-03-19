package com.river.service;

import java.util.List;
import java.util.Map;

import com.river.domain.User;

public interface UserService {

	List<User> findUserByName(String name);
	
	List<Map<String,String>> findBankName();
}
