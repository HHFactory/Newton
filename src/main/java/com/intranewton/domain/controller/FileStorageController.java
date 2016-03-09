package com.intranewton.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.intranewton.domain.service.FileStorageService;
import com.intranewton.domain.service.ManualService;

@Controller
public class FileStorageController {
	@Autowired
	ManualService manualService;
	
	/** ファイル保存先 **/
	@Value("${filedirectory.path}")
	private String fileDirectory;
	/** 画像保存先 **/
	@Value("${imagedirectory.path}")
	private String imageDirectory;
	
	/**
	 * ファイルアップロード
	 * @param file
	 * @param categoryID
	 */
	@RequestMapping(value="/upload/file",method=RequestMethod.POST)
	@ResponseBody
	public void fileUploadHandler(@RequestParam("file") MultipartFile file,@RequestParam("categoryID") Integer categoryID) {
		if(!file.isEmpty()){
			FileStorageService fileStorageService = new FileStorageService();
			//ファイルアップロード処理
			String fileName = fileStorageService.uploadFile(file, fileDirectory);
			//アップロード成功時にDBに登録情報を格納
			if(!fileName.isEmpty()){
				manualService.postFileInfo(fileName, categoryID);
			}
		}else{
			System.out.println("file empty");
		}
	}
	
	/**
	 * ファイル削除
	 * @param fileName
	 */
	@RequestMapping(value="/delete/file",method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void fileDeleteHandler(@RequestParam("id") Integer targetId,@RequestParam("name") String targetFileName) {
		//対象データをDBから削除
		manualService.deleteFileInfo(targetId);
		//ファイル削除処理
		String filePath = fileDirectory + targetFileName;
		new FileStorageService().deleteFile(filePath);
	}
	
	/**
	 * 画像アップロード
	 * @param image
	 * @return
	 */
	@RequestMapping(value="/upload/image",method=RequestMethod.POST, produces = "text/plain; charset=utf-8")
	@ResponseBody
	public String imageUploadHandler(@RequestParam("image") MultipartFile image) {
		if(!image.isEmpty()){
			FileStorageService fileStorageService = new FileStorageService();
			//アップロードしたファイル名を返却
			return fileStorageService.uploadFile(image, imageDirectory);
		}else{
			return "image empty";
		}
	}
	
	/**
	 * 画像削除
	 * @param files
	 */
	@RequestMapping(value="/delete/image",method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void imageDeleteHandler(@RequestParam("files") String[] fileNameList) {
		FileStorageService fileStorageService = new FileStorageService();
		for(String fileName:fileNameList){
			String filePath = imageDirectory + fileName; 
			fileStorageService.deleteFile(filePath);
		}
	}
	
}
