package com.intranewton.domain.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.aspectj.internal.lang.reflect.PointcutBasedPerClauseImpl;
import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.intranewton.domain.entity.Manual;
import com.intranewton.domain.service.ManualService;
import com.sun.org.apache.xml.internal.resolver.helpers.PublicId;

@Controller
public class FileUploadController {
	@Autowired
	ManualService manualService;
	
	/** ファイル保存先 **/
	@Value("${uploaddirectory.path}")
	private String directory;
	/** 画像保存先 **/
	@Value("${uploadimage.path}")
	private String imageDirectory;
	
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
	
	/**
	 * ファイル削除処理
	 * @param fileName
	 */
	@RequestMapping(value="/delete",method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteFile(@RequestParam("id") Integer targetId,@RequestParam("name") String targetFileName) {
		//対象データをDBから削除
		manualService.deleteFileInfo(targetId);
		//格納されているファイルを削除
		String filePath = directory + targetFileName;
		File targetFile = new File(filePath);
		if(targetFile.exists()){
			if(targetFile.delete()){
				System.out.println("ファイルが正常に削除されました。");
			}else{
				System.out.println("ファイルの削除に失敗しました。");
			}
		}else{
			System.out.println("ファイルが見つかりません");
		}
	}
	
	/**
	 * 画像アップロード処理
	 * TODO:ファイルアップロードと共通化
	 */
	@RequestMapping(value="/upload/image",method=RequestMethod.POST, produces = "text/plain; charset=utf-8")
	@ResponseBody
	public String postImage(@RequestParam("image") MultipartFile image) {
		if(!image.isEmpty()){
			try{
				//アップロード時のタイムスタンプを取得し、ファイル名に付与
				Timestamp timestamp = new Timestamp(new Date().getTime());
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
				String timestampStr = dateFormat.format(timestamp);
				String fileName = timestampStr + "_" + image.getOriginalFilename();
				String filePath = Paths.get(imageDirectory, fileName).toString();								
				//ファイルアップロード
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
				stream.write(image.getBytes());
				stream.close();
				return fileName;
			}catch(Exception e){
				return e.getMessage();
			}
		}else{
			return "image empty";
		}
	}
	
}
