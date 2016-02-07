package com.intranewton.domain.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.intranewton.domain.service.ManualService;
import com.sun.xml.internal.bind.v2.TODO;

@Controller
public class FileUploadController {
	@Autowired
	ManualService manualService;
	
	@RequestMapping(value="/upload",method=RequestMethod.POST)
	@ResponseBody
	//TODO:戻り値の型を調整、同じファイル名があった場合は登録できないようにする
	public void handleFileUpload(@RequestParam("file") MultipartFile file) {
		if(!file.isEmpty()){
			try{
				String directory = "./src/main/resources/public/app/files";
				String filePath = Paths.get(directory, file.getOriginalFilename()).toString();								
				
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
				stream.write(file.getBytes());
				stream.close();
				//manualService.postManual(name, filePath);
				System.out.println(file.getOriginalFilename() + "  uploaded");
				
			}catch(Exception e){
				System.out.println(e.getMessage());
				
			}
		}else{
			System.out.println("file empty");
		}
	}
	
}
