package com.intranewton.domain.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
	
	/** アップロード先をpropertiesファイルから読み込む **/
	@Value("${uploaddirectory.path}")
	private String directory;
	
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
				Timestamp timestamp = new Timestamp(new Date().getTime());
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
				String timestampStr = dateFormat.format(timestamp);
				String fileName = timestampStr + "_" + file.getOriginalFilename();
				String filePath = Paths.get(directory, fileName).toString();								
				//ファイルアップロード
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
				stream.write(file.getBytes());
				stream.close();
				//登録情報をDBに格納
				manualService.postFileInfo(fileName, categoryID);
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
