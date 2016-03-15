package com.intranewton.domain.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import com.intranewton.elastic.restcontroller.ElasticsearchRestController;

public class FileStorageService {
	/** ロガー*/
	private static final Logger logger  = LoggerFactory.getLogger(ElasticsearchRestController.class);

	/**
	 * ファイルアップロード処理
	 * @param uploadFile
	 * @param uploadDirectory
	 */
	public String uploadFile(MultipartFile uploadFile, String uploadDirectory) {
		//アップロード時のタイムスタンプを取得し、ファイル名に付与
		Timestamp timestamp = new Timestamp(new Date().getTime());
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String timestampStr = dateFormat.format(timestamp);
		String fileName = timestampStr + "_" + uploadFile.getOriginalFilename();
		String filePath = Paths.get(uploadDirectory, fileName).toString();
		//ファイルアップロード
		try {
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
			stream.write(uploadFile.getBytes());
			stream.close();
		}catch(Exception e){
			fileName = "";
		}
		return fileName;
	}
	
	/**
	 * ファイル削除処理
	 * @param filePath
	 */
	public void deleteFile(String filePath) {
		File targetFile = new File(filePath);
		if(targetFile.exists()){
			if(targetFile.delete()){
				logger.info("ファイルが正常に削除されました");
			}else{
				logger.info("ファイルの削除に失敗しました");
			}
		}else{
			logger.error("削除対象ファイルが見つかりません");
		}
	}
	
}
