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

@Controller
public class FileUploadController {
	@Autowired
	ManualService manualService;
	
	@RequestMapping(value="/upload",method=RequestMethod.POST)
	@ResponseBody
	//TODO:同じファイル名があった場合は登録できないようにする
	public void handleFileUpload(@RequestParam("file") MultipartFile file,@RequestParam("categoryID") Integer categoryID) {
		if(!file.isEmpty()){
			try{
				String directory = "./src/main/resources/public/app/files";
				String filePath = Paths.get(directory, file.getOriginalFilename()).toString();								
				
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
				stream.write(file.getBytes());
				stream.close();
				manualService.postManual(file.getOriginalFilename(), filePath, categoryID);
				System.out.println(file.getOriginalFilename() + "  uploaded");
			}catch(Exception e){
				System.out.println(e.getMessage());				
			}
		}else{
			System.out.println("file empty");
		}
	}
	
}
