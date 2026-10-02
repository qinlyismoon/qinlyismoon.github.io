function cx(...values) {
  return values.filter(Boolean).join(" ");
}

export function Section({ as: Element = "section", className, children, ...props }) {
  return (
    <Element className={cx("ds-section", className)} {...props}>
      {children}
    </Element>
  );
}

export function Divider({ className, ...props }) {
  return <hr className={cx("ds-divider", className)} {...props} />;
}

export function Button({ as: Element = "button", className, children, ...props }) {
  return (
    <Element className={cx("ds-button", className)} {...props}>
      {children}
    </Element>
  );
}

export function Link({ className, children, ...props }) {
  return (
    <a className={cx("ds-link", className)} {...props}>
      {children}
    </a>
  );
}

export function Card({ as: Element = "article", className, children, ...props }) {
  return (
    <Element className={cx("ds-card", className)} {...props}>
      {children}
    </Element>
  );
}

export function Tag({ as: Element = "span", className, children, ...props }) {
  return (
    <Element className={cx("ds-tag", className)} {...props}>
      {children}
    </Element>
  );
}

export function ProjectPreview({
  title,
  description,
  meta,
  tags = [],
  href,
  className,
}) {
  const content = (
    <>
      <div className="ds-project-preview__content">
        {meta ? <p className="ds-project-preview__meta">{meta}</p> : null}
        <h3 className="ds-project-preview__title">{title}</h3>
        {description ? (
          <p className="ds-project-preview__description">{description}</p>
        ) : null}
      </div>
      {tags.length ? (
        <div className="ds-project-preview__tags" aria-label="Project topics">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      ) : null}
    </>
  );

  return (
    <Card className={cx("ds-project-preview", className)}>
      {href ? (
        <a className="ds-project-preview__link" href={href}>
          {content}
        </a>
      ) : (
        content
      )}
    </Card>
  );
}
