package com.intranewton.domain.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.intranewton.domain.service.ManualService;

@Controller
public class FileUploadController {
	@Autowired
	ManualService manualService;
	
	/**
	 * ファイルアップロード処理
	 * @param file
	 * @param categoryID
	 */
	@RequestMapping(value="/upload",method=RequestMethod.POST)
	@ResponseBody
	public void handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("categoryID") Integer categoryID) {
		if(!file.isEmpty()){
			try{
				//アップロード時のタイムスタンプを取得し、ファイル名に付与
				final String timestampStr = new Timestamp(new Date().getTime()).toString();
				String directory = "app/files";
				String filePath = Paths.get(directory, file.getOriginalFilename()).toString();								
				//ファイルアップロード
				String fileName = timestampStr + "_" + file.getOriginalFilename();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(fileName)));
				stream.write(file.getBytes());
				stream.close();
				//登録情報をDBに格納
				manualService.postFileInfo(file.getOriginalFilename(), filePath, categoryID);
				System.out.println(file.getOriginalFilename() + "  uploaded");
			}catch(Exception e){
				System.out.println(e.getMessage());				
			}
		}else{
			System.out.println("file empty");
		}
	}
	
	@RequestMapping(value="/upload/tmp",method=RequestMethod.POST)
	@ResponseBody
	public void tmpImageFileUpload(@RequestParam("file") MultipartFile file) {
		if(!file.isEmpty()){
			try {
				String directory = "./src/main/resources/public/app/files/tmp";
				String filePath = Paths.get(directory,file.getOriginalFilename()).toString();
				System.out.println(filePath);
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
				stream.write(file.getBytes());
				stream.close();
			}catch (Exception e) {
				System.out.println("upload failed");
			}
		}else{
			System.out.println("file empty");
		}
	}
	
}
