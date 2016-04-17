<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/18/15
 * Time: 1:46 PM
 */

namespace Bux\AccountBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class ConvertMinutsFormType
 *
 * @package Bux\AccountBundle\Form\Type
 */
class ConvertMinutesFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('minutes', 'integer', array(
                'constraints' => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'convert_minuts_form_type';
    }
}