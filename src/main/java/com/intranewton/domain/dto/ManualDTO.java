package com.intranewton.domain.dto;

import java.util.List;

import com.intranewton.domain.entity.Manual;

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
	private String name;
	private List<Manual> manuals;
	private List<ManualDTO> children;
}
