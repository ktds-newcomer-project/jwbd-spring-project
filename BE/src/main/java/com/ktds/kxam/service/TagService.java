package com.ktds.kxam.service;

import com.ktds.kxam.entity.Tag;
import com.ktds.kxam.exception.ApiMessageException;
import com.ktds.kxam.repo.TagRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class TagService {

    private final TagRepo tagRepo;

    @Transactional
    public void saveTag(String tagName) {

        int countTagName = tagRepo.countTagsByTagName(tagName);
        if(countTagName>0)
            throw new ApiMessageException("이미 존재하는 태그입니다.");
        else{
            Tag tag = Tag.builder().tagName(tagName).build();
            Tag saveResult = tagRepo.save(tag);
            if(saveResult == null) throw new ApiMessageException("태그 등록에 실패하였습니다.");
        }

    }

    public List<Tag> findTagsByTagNameContaining(String tagName){

        List<Tag> result = tagRepo.findTagsByTagNameContaining(tagName);

        if(result.size() == 0)
            throw new ApiMessageException("태그가 검색되지 않았습니다.");

        return result;
    }

    @Transactional
    public void modifyTagName(Long tagId, String tagName){
        Tag result = tagRepo.findById(tagId).orElseThrow(()->new ApiMessageException("태그가 존재하지 않습니다."));
        tagRepo.modifyTagName(tagId, tagName);
    }

    public List<Tag> findTagsByProblem(Long pid){
        List<Tag> result = tagRepo.findTagsByProblem(pid);
        if(result.size()==0) throw new ApiMessageException("태그가 존재하지 않습니다.");
        return result;
    }
}
