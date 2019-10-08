package com.cpe.springboot.card.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class CardReference implements Serializable {

	private static final long serialVersionUID = -7059808842444736266L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String name;
	private String description;
	private String family;
	private String affinity;
	private String imgUrl;
	private String smallImgUrl;

	public CardReference() {

	}

	public CardReference(CardReference c) {
		super();
		this.id=c.getId();
		this.name = c.getName();
		this.description = c.getDescription();
		this.family = c.getFamily();
		this.affinity = c.getAffinity();
		this.imgUrl=c.getImgUrl();
		this.smallImgUrl=c.getSmallImgUrl();
	}

	public CardReference(String name, String description, String family, String affinity,String imgUrl,String smallImgUrl) {
		super();
		this.name = name;
		this.description = description;
		this.family = family;
		this.affinity = affinity;
		this.smallImgUrl=smallImgUrl;
		this.imgUrl=imgUrl;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getFamily() {
		return family;
	}
	public void setFamily(String family) {
		this.family = family;
	}
	public String getAffinity() {
		return affinity;
	}
	public void setAffinity(String affinity) {
		this.affinity = affinity;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getSmallImgUrl() {
		return smallImgUrl;
	}

	public void setSmallImgUrl(String smallImgUrl) {
		this.smallImgUrl = smallImgUrl;
	}
}
