package org.zerock.sampleapi01.controller;


import lombok.extern.log4j.Log4j2;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@RestController
@Log4j2
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class DownController {


    @GetMapping("/downEx")
    public ResponseEntity<byte[]> downloadEx() {

        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Type","application/octet-stream");
        headers.add("Content-Disposition", "attachment;filename=" + "cat.jpg");

        File file = new File("/Users/zerock/temp/cat.jpg");

        try {
            byte[] data = FileCopyUtils.copyToByteArray(file);

            return ResponseEntity.ok().headers(headers).body(data);

        } catch (IOException e) {
            log.info(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

}
