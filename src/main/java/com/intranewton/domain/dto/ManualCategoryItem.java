package com.intranewton.domain.dto;

import java.util.List;

import com.intranewton.domain.entity.Manual;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManualCategoryItem {
	private String name;
	private Integer pathLength;
	private List<Manual> manuals;
}
