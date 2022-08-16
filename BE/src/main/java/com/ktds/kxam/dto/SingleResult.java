package com.ktds.kxam.dto;

import lombok.Data;

@Data
public class SingleResult<T> extends CommonResult {
    private T data;
}
