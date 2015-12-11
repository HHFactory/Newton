package com.intranewton.domain.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * クライアントに返却するマニュアルDTO
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManualDTO {
	private List<String> category_list;
	private String manual_file_name;
	private String manual_file_path;
}
