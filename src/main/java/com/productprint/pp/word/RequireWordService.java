package com.productprint.pp.word;

import java.util.List;

public interface RequireWordService {
	void insertFromCsvFile(String file) throws Exception ;
	void insertFromCsv(String dir) throws Exception ;
	List<RequireWord> getAll();
	void distinctWord();
}
