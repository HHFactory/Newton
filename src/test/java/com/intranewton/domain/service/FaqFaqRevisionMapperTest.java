package com.intranewton.domain.service;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

import org.dozer.DozerBeanMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.intranewton.common.config.DozerBeanMapperConfiguration;
import com.intranewton.domain.entity.Faq;
import com.intranewton.domain.entity.FaqRevision;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {
	DozerBeanMapperConfiguration.class,
	FaqFaqRevisionDozerMapperConfiguration.class
})
public class FaqFaqRevisionMapperTest {
	@Autowired
	DozerBeanMapper faqFaqRevisionDozerMapper;

	/**
	 * IDはコピーされず、他の全項目がコピーされることの確認。
	 */
	@Test
	public void testMapper() {
		final int id = 2;
		final String title = "Test title";
		final String content = "Test content";
		final String talkScript = "Test talk_script";
		final int usefulCount = 42;
		Faq faq = new Faq(title, content, talkScript, usefulCount);
		faq.setId(id);

		FaqRevision faqRevision = faqFaqRevisionDozerMapper.map(faq, FaqRevision.class);

		assertThat(faqRevision.getId(), is(nullValue()));
		assertThat(faqRevision.getTitle(), is(title));
		assertThat(faqRevision.getContent(), is(content));
		assertThat(faqRevision.getTalkScript(), is(talkScript));
		assertThat(faqRevision.getUsefulCount(), is(usefulCount));
		assertThat(faqRevision.getFaq(), is(faq));
	}
}
