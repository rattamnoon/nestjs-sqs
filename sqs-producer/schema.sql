CREATE TABLE public.report_queue (
	id uuid NOT NULL,
	payload jsonb NOT NULL,
	status varchar NOT NULL,
	report_url varchar NULL,
	CONSTRAINT report_queue_pk PRIMARY KEY (id)
);
