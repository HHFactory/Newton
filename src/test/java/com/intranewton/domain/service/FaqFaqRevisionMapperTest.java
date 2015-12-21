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
import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.entity.FAQRevision;

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
		final String talk_script = "Test talk_script";
		final int useful_count = 42;
		FAQ faq = new FAQ(title, content, talk_script, useful_count);
		faq.setId(id);

		FAQRevision faqRevision = faqFaqRevisionDozerMapper.map(faq, FAQRevision.class);

		assertThat(faqRevision.getId(), is(nullValue()));
		assertThat(faqRevision.getTitle(), is(title));
		assertThat(faqRevision.getContent(), is(content));
		assertThat(faqRevision.getTalk_script(), is(talk_script));
		assertThat(faqRevision.getUseful_count(), is(useful_count));
		assertThat(faqRevision.getFaq(), is(faq));
	}
}
