<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/6/15
 * Time: 12:52 PM
 */

namespace Bux\AccountBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class WithDrawFormType
 *
 * @package Bux\AccountBundle\Form\Type
 */
class WithDrawFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('account', 'text', array(
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'withdraw_form_type';
    }
}