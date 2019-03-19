package com.river.controller;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.river.domain.User;
import com.river.service.UserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class UserController {
	
	private static final Logger logger = Logger.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	
	@RequestMapping("/login")
	public String login(String name,String password){
		List<User> userList = userService.findUserByName(name);
		for(User user:userList){
			if(password.equals(user.getPwd())){
				return "main";
			}else{
				logger.info("info");
				logger.debug("debug");
				return "login";
			}
		}
		logger.info("info");
		logger.debug("debug");
		return "login";
	}
	@RequestMapping(value="/main",produces="text/html;charset=UTF-8")
	@ResponseBody
	public String main(){
		return JSONArray.fromObject(userService.findBankName()).toString();
	}
	
}
