package com.productprint.pp.word;

import java.util.List;

public interface RequireWordDAO {
	void insert(RequireWord requireWord);
	List<RequireWord> getAll();
	void distinctWord();
}
