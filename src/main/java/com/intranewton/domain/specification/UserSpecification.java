package com.intranewton.domain.specification;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.intranewton.domain.entity.User;

public class UserSpecification {
	
	public Specification<User> skillContains(String skill){
		return StringUtils.isEmpty(skill) ? null : (root,query,cb) -> {
			return cb.equal(root.get("skill"), skill);
		};
	}
}
