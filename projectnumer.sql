SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
use projectnumer;
CREATE TABLE dataequation (
  value int(11) NOT NULL,
  label varchar(255) DEFAULT NULL,
  xl int(11) DEFAULT NULL,
  xr int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO dataequation (`value`, `label`, `xl`, `xr`) VALUES
(1, '(x^2)-4', -1, 5),
(2, '(x^2)-16', 2, 5),
(3, '(x^4)-13', 0, 2);
ALTER TABLE `dataequation`
  ADD PRIMARY KEY (`value`);
ALTER TABLE `dataequation`
  MODIFY `value` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;
