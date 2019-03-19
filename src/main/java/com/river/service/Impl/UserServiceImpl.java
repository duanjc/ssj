package com.river.service.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.river.dao.UserDao;
import com.river.domain.User;
import com.river.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao userDao;
	
	@Override
	public List<User> findUserByName(String name) {
		System.out.println("service");
		return userDao.findUserByName(name);
	}

	@Override
	public List<Map<String, String>> findBankName() {
		List<Map<String, String>> bkList = new ArrayList<Map<String, String>>();
		List<Map<String,Object>> bankNameList = userDao.findBankName();
		for(Map<String,Object> map:bankNameList){
			Map<String,String> bkmap = new HashMap<String, String>();
			for(String string : map.keySet()){
				if(map.get(string) == null){
					bkmap.put(string.toLowerCase(),"");
				}else{
					System.out.println("key="+string+"\tvalue="+map.get(string).toString());
					bkmap.put(string.toLowerCase(),map.get(string).toString());
				}
				
			}
			bkList.add(bkmap);
		}
		
		return bkList;
	}
	
}
