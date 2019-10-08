package com.cpe.springboot.store.controller;

import org.springframework.data.repository.CrudRepository;

import com.cpe.springboot.store.model.StoreModel;

public interface StoreRepository extends CrudRepository<StoreModel, Integer> {
	

}
